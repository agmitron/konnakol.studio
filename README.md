![example workflow](https://github.com/agmitron/handpanistan/actions/workflows/hello.yml/badge.svg)

# Konnakol studio

> Konnakol (also spelled Konokol, Konakkol, Konnakkol) is the art of performing percussion syllables vocally in South Indian Carnatic music. Konnakol is the spoken component of solkattu, which refers to a combination of konnakol syllables spoken while simultaneously counting the tala (meter) with the hand.It is comparable[citation needed] in some respects to bol in Hindustani music, but allows the composition, performance or communication of rhythms. - Wikipedia

konnakol.studio is the software aims to help musicians (mostly percussion players) writing, sharing and training musical arrangements.

## Features

### Dojo

> A dōjō (道場) is a hall or place for immersive learning or meditation.

In konnakol.studio's Dojo you can open a prepared composition and practice it. The Dojo will check every played sound and match it with the written one in the composition. The application listens your microphone, expects that you play specified frequencies with specified BPM, and shows you the correctness of the performing.

Other features will be implemented soon, check the [roadmap section](#roadmap).

## Roadmap

#### Dojo

- [x] - Simple fractions checking with specified BPM
- [x] - Score system
- [ ] - Bind your instrument's frequencies to composition frequencies (in case if you play on different scale)
- [ ] - Redesign

#### Editor

- [x] Konnakol parser
- [ ] Store composition to the DB
- [ ] Units toolbar widgets `in progress`
- [ ] Musical ideas
- [ ] Composition parts
- [ ] Tabs UI

#### Other

- [x] - The library of arrangements
- [ ] - Marketplace 
- [ ] - Deploy (CI/CD)

#### Refactor

- [ ] Styled Components
- [ ] Feature Sliced Design

#### User

- [ ] Signing up
- [ ] Signing in
- [ ] List of bought compositions
- [ ] List of written compositions
- [ ] Time of practice total and last week
- [ ] Study progress

