pipeline{
	agent {
		dockerfile true
	}

    stage ('Clone repository') {
        
		checkout scm
    }
	
	stage ('Build image) {
        
		app = docker.build -t lidar-search-ui
    }

}