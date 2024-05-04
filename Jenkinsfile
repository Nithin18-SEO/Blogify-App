pipeline {

    agent any

    environment {
        registryUrl = 'programmer175/node-cicd'
        registryCredential = 'programmer175'
        dockerImage = ''
        cluster = 'BlogifyCluster'
        service = 'blogify_svc'
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

        stage('Deploy to Amazon ECS Cluster'){
        steps {
            withAWS(region: 'ap-south-1',credentials: 'jenkins_blogify') {
                script {
                   sh 'aws ecs update-service --cluster ${cluster} --service ${service} --force-new-deployment'
                }
            }
        }
     }

    }
}