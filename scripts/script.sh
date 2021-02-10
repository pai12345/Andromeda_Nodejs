#!/bin/bash

#===================================Helper Functions=====================================#
# Function to check if file exists
function check_for_file() {
   if [[ ! -f "$1" ]]; then
      return 1
    fi 
}

# Function for Nodejs Commands
function check_flag(){
    local KEY=$1
    case "$KEY" in
        "-c" | "--clean" )
                        echo "Cleaning dist Folder"
                        npm run clean
                        ;;
        "-h" | "--help")
                        echo "Generating Automation Manual"
                        flag_description
                        ;;
        "-n" | "--debug" )
                        echo "Running app with debug"
                        npm run debug
                        ;;
        "-d" | "--dev")
                        echo "Running app in Development Environment"
                        npm run dev
                        ;;
        "-p" | "--prod" )
                        echo "Running app in Production Environment"
                        npm run prod
                        ;;
        * ) 
            echo "Invalid flag passed to script"
            exit 1
            ;;
    esac
}
#==========================================================================================#

#========================================Utility Functions=================================#
function flag_description(){

local desribe="
=================== help ========================
NAME
    help

SYNOPSIS
    [-h or --help]

DESCRIPTION
    Command will produce a manual describing each flag, 
    their details and purpose.

=================== clean =======================
NAME
    clean

SYNOPSIS
    [-c or --clean]

DESCRIPTION
    Command will remove and recreate dist folder.
    Behind the scenes the command will run with:
    shx rm -r ./dist && shx mkdir dist

=================== debug ========================
NAME
    debug

SYNOPSIS
    [-n or --debug]

DESCRIPTION
    Command will package and run app in debug mode.
    Behind the scenes the command will run with:
    npm run clean && tsc && nodemon --inspect ./dist/index.js

=================== dev ========================
NAME
    dev

SYNOPSIS
    [-d or --dev]

DESCRIPTION
    Command will package and run app in develop.
    Behind the scenes the command will run with:
    npm run clean && npm run build-dev && npm run start

=================== prod ========================
NAME
    prod

SYNOPSIS
    [-p or --prod] 

DESCRIPTION
    Command will package and run app in production.
    Behind the scenes the command will run with:
    npm run clean && npm run build-prod && npm run start
"
echo "$desribe"
}


# Function for Home Page
function home_page() {
    # Project Manifest Data
    local PROJECT="Andromeda"
    local TYPE="GraphQL"
    local URL="https://andromeda.home.com"
    local DATE=$(date)
    local TAGS=("GraphQL","Andromeda","API","Jenkins")

    # Entry Page Description
    echo "======================= Welcome to Andromeda GraphQL ==========================="
    echo "Project: $PROJECT"
    echo "Type: $TYPE"
    echo "Url: $URL"
    echo "Tags: [${TAGS[@]}]"
    echo "Date: $DATE"
    echo ""
    echo "============ Enter Type of Operation ============"
    echo "[-c/--clean] to clean/create dist"
    echo "[-h/--help] to get more informations"
    echo "[-n/--debug] to start server with debug"
    echo "[-d/--dev] to build and start server in Development"
    echo "[-p/--prod] to build and start server in Production"
    echo ""
    read OPT
    echo ""
    check_flag $OPT
}

# Function for validatin prerequisites
function validate_prerequisites(){
  local current_path=$(pwd)

  # Check for package.json
  local file_packagejson="./package.json"
  check_for_file $file_packagejson
    if [[ $? -ne 0 ]]; then   
      echo "package.json not found in $current_path"
      exit 1
    fi

  # Check for package-lock.json
  local file_packagelockjson="./package-lock.json"
  check_for_file $file_packagelockjson
    if [[ $? -ne 0 ]]; then
      echo "package-lock.json not found in $current_path"
      exit 1
    fi

  # Check for tsconfig.json
  local file_tsconfigjson="./tsconfig.json"
  check_for_file $file_tsconfigjson
    if [[ $? -ne 0 ]]; then
      echo "tsconfig.json not found in $current_path"
      exit 1
    fi
  
  # Check for webpack.config.prod.js
  local file_webpackprod="./webpack.config.prod.js"
  check_for_file $file_webpackprod
    if [[ $? -ne 0 ]]; then
      echo "webpack.config.prod.js not found in $current_path"
      exit 1
    fi
  
  # Check for webpack.config.prod.js
  local file_webpackdev="./webpack.config.js"
  check_for_file $file_webpackdev
    if [[ $? -ne 0 ]]; then
      echo "webpack.config.js not found in $current_path"
      exit 1
    fi

  # Check for Dockerfile
  local file_Dockerfile="./Dockerfile"
  check_for_file $file_Dockerfile
    if [[ $? -ne 0 ]]; then
      echo "Dockerfile not found in $current_path"
      exit 1
    fi
}

#=============================================================================================#

#========================================Begin of Program=====================================#
# Execute Function for Validation checks
validate_prerequisites

# Check for positional arguments for script
if [[ $? -eq 0 ]]; then
    # Check if positional argument count is 0
    if [[ $# -eq 1 ]]; then
        for KEY in "$@";do
        check_flag $KEY
        done
    elif [[ $# -gt 1 ]];then
            echo "Enter only one flag"
            exit 1
    else
        # If no positional arguments found execute home_page
        home_page
    fi
fi
#=======================================End of Program========================================#