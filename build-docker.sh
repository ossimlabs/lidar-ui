#!/bin/sh

gradle aSAC
docker build -t nexus-docker-public-hosted.ossim.io/lidar-ui .
