## Create a file named `protected.js` in the same directory where `server.js` is saved.

### This should be the content of `protected.js`:

```
module.exports = {
    mongoDB_atlas_url: "MongoDB Atlas URL",
    SECRET_KEY: "Your secret key",
    emailAddress: "Email of the admin",
    password: "App password",
    Guardian_API_KEY: "API key"
}
```

### NOTE: Don't modify the `keys` of the above JavaScript object. 

You can generate the `App password` from <a href="https://myaccount.google.com/apppasswords?rapt=AEjHL4M9n3xSlpV6CEticowzaIBPXjKRZ0-mIg4p9I88UcJi_LTkP_gv0gMyDc3rI66IIiPJ2qHZvSbWwqLI9E9Lh8msYPXuxQ">here</a>.

And the API key from <a href="https://open-platform.theguardian.com/">here</a>.