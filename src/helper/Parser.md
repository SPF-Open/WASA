# Zip structure

- imsmanifest.xml (not useful)
- items (all questions + Intro)
  - [id]
    - qti.xml (required)
    - [name].png (optional)
    - assets (optional)
      - [id].png (optional)
  - styles (optional)
    - styles.css
  - style (optional)
    - custom
      - tao-user-styles.css
- tests (Definition of the different part)
  - [id]
    - test.xml (required)

```
.
├── imsmanifest.xml (not useful)
├── items (all questions + Intro)
│   ├── [id]
│   │   ├── qti.xml (required)
│   │   ├── [name].png (optional)
│   │   └── assets (optional)
│   │       └── [id].png (optional)
│   ├── styles (optional)
│   │   └── styles.css
│   └── style (optional)
│       └── custom
│           └── tao-user-styles.css
└── tests (Definition of the different part)
    └── [id]
        └── test.xml (required)
```
