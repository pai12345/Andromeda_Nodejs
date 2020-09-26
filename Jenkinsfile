pipeline{
    agent {
        docker { 
            image 'node' 
            } 
        }
    stages{
        stage('BUILD'){
          steps{
            sh 'npm i && npm audit'
          }
        }
    }
}