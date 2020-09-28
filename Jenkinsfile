pipeline{
    agent {
        docker { 
            image 'node:lts' 
            args '-p 8000:8000'
            } 
    }
    options {
        timeout(time: 5, unit: 'MINUTES') 
        skipDefaultCheckout true
    }  
    tools {nodejs "nodejs"}
    stages{
        stage('Cloning Repository'){
          steps{     
            script {
                  Exception caughtException = null
                  catchError(buildResult: 'SUCCESS', stageResult: 'ABORTED') { 
                    try { 
                      echo "test1"
                        // git credentialsId: 'github-credential', url: 'https://github.com/pai12345/Andromeda_Nodejs.git'  
                    } catch (Throwable e) {
                        caughtException = e
                    }
                  }
                  if (caughtException) {
                        error caughtException.message
                    }
            }
          }
        }
        stage('BUILD'){
          steps{
            script {
                  Exception caughtException = null
                  catchError(buildResult: 'SUCCESS', stageResult: 'ABORTED') { 
                  try { 
                    sh '''
                       npm ci
                       npm audit fix    
                      '''
                  } catch (Throwable e) {
                      caughtException = e
                      error e
                    }                  
                  }
                  //  if (caughtException) {
                  //       error caughtException.message
                  //   }
            }
          }
        }
    }
    post {
        always {
          echo "Cleaning Workspace"
          cleanWs()
        }
    }
}