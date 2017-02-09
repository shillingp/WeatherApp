
You must get two developer keys to use this project. They can be obtained from the following links

* [Dark Sky Key](https://darksky.net/dev/)
* [Google Maps Key](https://developers.google.com/maps/)

Once you have **both** of these keys you must make a file named `secrets.js` in the this directory. The `secrets.js` file must be as follows.

```javascript
// components/weather_data/secrets.js

export const secretKey = yourDarkSkyKeyHere;

export const googKey = yourGoogleMapsKeyHere;
```
