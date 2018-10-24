
export async function registerUser(name) {
    // server part
    console.log("challenge" , name);
    var challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);
    console.log("challenge" , challenge);
    
    // client part
    var encoder = new TextEncoder("uft-8");
    registerUserClient(challenge, {
        id: encoder.encode(name),
        name,
        displayName: name
    }).then((credentials) => {
        console.log("credentials ", credentials)
        // server part
        localStorage.setItem("credentials." + name, credentials);

        var challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);
    
        authenticate(challenge, credentials.rawId).then(response => {
            console.log("auth", response)}, error => {console.log("auth error", error)
        })        
    }, (error) => console.log("error ", error));
}

async function registerUserClient(challenge, user) {
    console.log("try to create credentials ", window.isSecureContext)
    return navigator.credentials.create({ publicKey: {
        challenge,
        rp: { id: "localhost", name: "PWA Playgrounds" },
        user,
        pubKeyCredParams: [ {type: "public-key", alg: -7} ]
    }});    
}

  
function authenticate(challenge, credentialId) {
    return navigator.credentials.get({ 
        publicKey: {
        challenge,
        rpId: "localhost",
        allowCredentials: [{
            type: "public-key",
            id: credentialId
        }],
        userVerification: "preferred", //one of "required", "preferred", "discouraged"
    }});
}
  