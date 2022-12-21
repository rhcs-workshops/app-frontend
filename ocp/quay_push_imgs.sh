#!/bin/bash
##
# Script to copy jump-app-images to quay
##

## Params
REGISTRY_SERVER=quay.io
REGISTRY_PROJECT=acidonpe
REGISTRY=$REGISTRY_SERVER/$REGISTRY_PROJECT

## Imagestreams Jump App
IS="dstrategies-frontend"

## Publish internal registry 
oc patch configs.imageregistry.operator.openshift.io/cluster --patch '{"spec":{"defaultRoute":true}}' --type=merge
sleep 20

## Login registries
HOST=$(oc get route default-route -n openshift-image-registry --template='{{ .spec.host }}')
podman login -u kubeadmin -p $(oc whoami -t) --tls-verify=false $HOST 
podman login $REGISTRY_SERVER

## Pull Jump App images
NS=$(oc project --short)
for i in $IS
do
  skopeo copy docker://$HOST/$NS/$i:latest docker://$REGISTRY/$i:latest --src-tls-verify=false
done

