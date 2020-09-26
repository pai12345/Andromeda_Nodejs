pipeline{
    agent:any
    stages{
        stage('Nodejs BUILD'){
          steps{
            sh 'npm i && npm audit'
          }
        }
    }
}