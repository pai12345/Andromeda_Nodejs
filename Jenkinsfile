pipeline{
    agent {
        docker { 
            image 'node:lts' 
            args '-p 8000:8000'
            } 
    }
    options {
        timeout(time: 5, unit: 'MINUTES') 
    }  
    tools {nodejs "nodejs"}
    stages{
        stage('Cloning Repository'){
          steps{     
            script {
                  Exception caughtException = null
                  catchError(buildResult: 'SUCCESS', stageResult: 'ABORTED') { 
                    try { 
                        git credentialsId: 'github-credential', url: 'https://github.com/pai12345/Andromeda_Nodejs.git'  
                    } catch (Throwable e) {
                        error e.message
                    }
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
                      error e.message
                    }
                  }
            }
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