properties([
    parameters ([
        string(name: 'BUILD_NODE', defaultValue: 'omar-build', description: 'The build node to run on'),
        booleanParam(name: 'CLEAN_WORKSPACE', defaultValue: true, description: 'Clean the workspace at the end of the run')
    ]),
    pipelineTriggers([
            [$class: "GitHubPushTrigger"]
    ]),
    [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/Maxar-Corp/LIDAR-Search-UI'],
    buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '3', daysToKeepStr: '', numToKeepStr: '20')),
    disableConcurrentBuilds()
])

node("${BUILD_NODE}") {

 	stage ('Clone repository') {
		checkout scm
	}
	
	stage ('Build image') {
        sh """
           docker build -t nexus-docker-private-hosted.ossim.io/lidar-search-ui .
        """		
    }

	stage('Push Docker Images to Nexus Registry'){
       		withCredentials([[$class: 'UsernamePasswordMultiBinding',
                        credentialsId: 'nexusCredentials',
                        usernameVariable: 'MAVEN_REPO_USERNAME',
                        passwordVariable: 'MAVEN_REPO_PASSWORD']])
        {
			sh """
			   docker push nexus-docker-private-hosted.ossim.io/lidar-search-ui
			"""
		}
	}
	
	stage("Load Variables")
    {
        withCredentials([string(credentialsId: 'o2-artifact-project', variable: 'o2ArtifactProject')]) {
            step ([$class: "CopyArtifact",
                projectName: o2ArtifactProject,
                filter: "common-variables.groovy",
                flatten: true])
        }

        load "common-variables.groovy"
    }
		
    try {
       	stage ("OpenShift Tag Image") {
           	withCredentials([[$class: 'UsernamePasswordMultiBinding',
				credentialsId: 'openshiftCredentials',
				usernameVariable: 'OPENSHIFT_USERNAME',
				passwordVariable: 'OPENSHIFT_PASSWORD']]){
				
                	// Run all tasks on the app. This includes pushing to OpenShift and S3.
                	sh """
                    	./gradlew openshiftTagImage \
                        	-PossimMavenProxy
                	"""
            	}
			}
    	} catch (e) {
        	echo e.toString()
    	}

    stage("Clean Workspace"){
        if ("${CLEAN_WORKSPACE}" == "true")
           	step([$class: 'WsCleanup'])
    	}	
}
