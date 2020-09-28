pipeline{
    agent {
        docker { 
            image 'node:lts' 
            args '-p 8000:8000'
            } 
        }
    stages{
        stage('BUILD'){
          steps{
            sh '''
                  npm i 
                  npm audit
               '''
          }
        }
    }
     post { 
        always { 
            echo 'Cleaning Workspace'
            cleanWs()
        }
    }
}