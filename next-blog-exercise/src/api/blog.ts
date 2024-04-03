"use client"

import axios from "axios"

const base_url = "http://localhost:6570/api"
const access_token = "i8EKrSf2agSubIgFn6kiOvv3kFjgZUG_UIZviR3T_CQ"
const space_id = 'y4lqlhcyc2lr'
const content_type = 'post'

export function getDataPost() {
    //return axios.get(`https://cdn.contentful.com/spaces/${space_id}/environments/master/entries?access_token=${access_token}&content_type=${content_type}`)
    return axios.get(base_url + "/posts",)
}

export function getDetailDataPost(id: string) {
    //return axios.get(`https://cdn.contentful.com/spaces/${space_id}/environments/master/entries/${id}?access_token=${access_token}`)
    return axios.get(base_url + "/posts/" + id)
}

export function getImage(id: string) {
    return axios.get(`https://cdn.contentful.com/spaces/${space_id}/environments/master/assets/${id}?access_token=${access_token}`)
}