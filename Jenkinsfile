def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]
pipeline{
    agent{
        label "Master"
    }
    tools{
        nodejs "Nodejs"
        dockerTool 'Docker'
    }
    environment{
        DOCKER_CREDENTIALS="docker-hub-credentials"
        DOCKER_IMAGE="diaaqassem1/article"
    }
    stages{
        stage("Fetch Code from VCS"){
            steps{
                echo "======== Fetching ========"
                git url: "https://github.com/diaaqassem/Article-Management-API.git", branch: "main"
            }
            post{
                success{
                    echo "========Fetched Successfully========"
                }
                failure{
                    echo "========Fetching Failed========"
                }
            }
        }
        stage("Build App Image"){
            steps{
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${BUILD_NUMBER}", "./")
                }
            
            }
            post{
                success{
                    echo "========Built Successfully========"
                }
                failure{
                    echo "========Building Failed========"
                }
            }
        }
       stage('Upload App Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
                        dockerImage.push("${BUILD_NUMBER}")
                        dockerImage.push("latest")
                    }
                }
            }
            post{
                success{
                    echo "========Upload Successfully========"
                }
                failure{
                    echo "========Upload Failed========"
                }
            }
        }
     stage('Cleanup') {
            steps {
                script {
                    sh "docker rmi ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                    sh "docker rmi ${DOCKER_IMAGE}:latest"
                }
            }
            post{
                success{
                    echo "========Cleanup Successfully========"
                }
                failure{
                    echo "========Cleanup Failed========"
                }
            }
        }
    }
    post{
        always {
            echo 'Slack Notifications.'
            slackSend channel: '#devops',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}
