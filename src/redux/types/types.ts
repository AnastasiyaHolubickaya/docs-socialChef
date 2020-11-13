export type photoType={
    small:string|null
    large?:string|null
}
export type usersType={
    id:number
    name:string
    status:string|null
    photos:photoType
    followed:boolean
}
export type menuItemsType = {
    id: number
    title:string|null
    path:string|null
}

export type newsType={
    id:number
    title:string|null
    img:string|null
    description: string|null
    link:string|null
}
export type dataUsersType ={
    photos:photoType
    id: number|null
    name: string|null
    mess: string|null
}
export type contactsType = {
    facebook:string
    website:string
    vk:string
    twitter:string
    instagram:string
    youtube:string
    github:string
    mainLink:string
}

export type profileType ={
    aboutMe:string|null
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription:string|null
    fullName:string|null
    userId:number
    photos:photoType
}
export type  dataMyPostsType ={
    id?: number
    img: string|null
    mess:string
    link?:string
    like:number
}