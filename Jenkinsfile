pipeline {

    agent any

    environment {
        registryUrl = 'programmer175/node-cicd'
        registryCredential = 'programmer175'
        dockerImage = ''
        // cluster = 'ReactApp-Cluster'
        // service = 'reactappsvc'
    }

    stages {

        stage('Build Image') {
            steps {
                script {
                   dockerImage = docker.build registryUrl + ":$BUILD_NUMBER"
                }
            }
        }

        stage('Push to Dockerhub Registry') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                        dockerImage.push("latest")
                    }
                }
            }
        }

    //     stage('Deploy to Amazon ECS Cluster'){
    //     steps {
    //         withAWS(region: 'us-east-1',credentials: 'jenkins-aws') {
    //             script {
    //                sh 'aws ecs update-service --cluster ${cluster} --service ${service} --force-new-deployment'
    //             }
    //         }
    //     }
    //  }

    }
}