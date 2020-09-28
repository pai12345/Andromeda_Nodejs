pipeline{
    agent {
        docker { 
            image 'node:lts' 
            args '-p 8000:8000'
            } 
        }
    tools {nodejs "nodejs"}
    stages{
        stage('Cloning Repository'){
          steps{
            git credentialsId: 'github-credential',
            url: 'https://github.com/pai12345/Andromeda_Nodejs.git'
          }
        }
        stage('BUILD'){
          steps{
            sh '''
                  npm i 
                  npm audit
                  npm run prod
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