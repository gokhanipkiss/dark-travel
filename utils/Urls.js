import { Dimensions } from "react-native"

export const _screen = Dimensions.get('screen');

// gerek kalmadı, axios mock adapter kullanıyoruz artık
export const mockJsonUrl = "https://my-json-server.typicode.com/gokhanipkiss/mockJson"  


// Firebase Storage URLs:

export const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/odisea-deneme1.appspot.com/o/' 
//locations%2Fthumb-manyetik.png?alt=media&token=d7cf1a2c-7a9c-4279-9488-c5fb8f870d5b

export const thumbUris = {
    locations: {
        no129: '' ,
        manyetik: 'locations%2Fthumb-manyetik.png' ,
        cuma: ''
    }
}

export const thumbTokens = {
    locations: {
        no129: '' ,
        manyetik: 'd7cf1a2c-7a9c-4279-9488-c5fb8f870d5b' ,
        cuma: ''
    }
}




