Throttling-API-client
=====================

Löytyy serveri-versio, sekä moduuli-versio. Kumpikin tekee requestilla kutsuja facebookille, ja kumpikin on rajoitettu 600:an kyselyyn 10min aikana. Virheet kirjoitetaan loki-tiedostoon, ja moduuli-versio palauttaa siihen kohdistuvat pyynnöt Q-promiseina.

