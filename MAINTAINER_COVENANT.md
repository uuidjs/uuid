# Maintainer Covenant

This document provides the criteria by which you should expect to hold the maintainers of this project accountable. Please note, however, this is not intended to be legally binding in any way. Rather, it is an aid for people interested in assessing the overall integrity and security of this project.

Constructive criticism is encouraged, and may be submitted [here](./issues/).

Each section of this document contains a **Declaration** and **Criteria**. The Declaration provides the basic information relevant to the section (e.g. the name of each maintainer in the **Team** section).

The Criteria is a list of measurable (or at least objectively evaluatable) criterion by which you should expect to evaluate this project. Each criterion is prefixed with a `snake-case-name` for easy reference. (The definitions for these may be broken out into a separate document at a later date, but are included here for now.)

## Definitions

&#x1fa84; "**Maintainer**": A person(s) responsible for the integrity of a project and associated community

&#x1fa84; "**Criteria**": Measurable metrics by which a project may be assessed

&#x1fa84; "**Secret**": login/passwords, access tokens, API keys, or other credentials that may be used to access sensitive information.

&#x1fa84; "**Local device**": laptop, phone, tablet, or other device that may be lost, stolen, or otherwise accessed by someone other than the maintainer

## Team

**Declaration**

The maintainers of this project are:

|                              |                           |
| ---------------------------- | ------------------------- |
| **Christoph Tavan, @ctavan** | Google                    |
| **Robert Kieffer, @broofa**  | Google, Facebook, CodePen |

**Criteria**

- [x] `bus-factor`: To mitigate the "[bus factor](https://en.wikipedia.org/wiki/Bus_factor)" risk, projects are expected to have 2 or more maintainers
- [x] `trusted-maintainers`: To mitigate bad-actor risk, maintainers will be verifiably reputable and trustworthy members of the community. Current maintainers will do due diligence before adding any new maintainer to insure they meet this standard.
- [ ] `active-team`: To mitigate risks that come from an oversize team, maintainers who have not engaged with the project in 12 months should have their maintainer privileges revoked

## Source Code

**Declaration** Source code for this project is maintained at https://github.com/uuidjs/uuid

**Criteria**

- [x] `review-required`: PRs require approval from other team members:
- [ ] `no-main-commit`: Changes to main branch must be made via PR. (Implies force-push is disabled)

## Publication

This project is published at https://npmjs.org/uuid

**Criteria**

- [x] `semver`: Releases use Semantic Versioning
- [x] `maintainer-only`: Only maintainers have publication privileges

## Data

**Declaration**:

This project uses BrowserStack for CI testing, which requires production API tokens

**Criteria**

- [x] `secure-production-secrets`: All production "secrets" to be encrypted and maintained in secure locations
- [x] `no-passwords-in-repo`: No passwords or secrets in source repository

## Accounts

**Declaration**:

This project requires access to the following systems:

|                  |                |
| ---------------- | -------------- |
| **GitHub**       | Source control |
| **NpmJS**        | Publication    |
| **BrowserStack** | CI testing     |

**Criteria**

- [x] `2fa-enabled`: All maintainers to have 2FA enabled for any project-sensitive logins
- [x] `generated-passwords`: Passwords to be unique and randomly generated for each account
- [x] `no-shared-accounts`: Maintainers do not share account information. I.e. maintainer access can be managed via roles and permissions.
- [n/a] `no-local-secrets`: Secrets should not be kept on local devices
- [n/a] `managed-local-secrets`: Where necessary secrets on local devices to be kept in a secure, reputable password manager (e.g. 1Password, LastPass)

## Incident Response

**Declaration**

[TODO: This]

**Criteria**

[TODO: I think these are important, but they're not really evaluatable. More like a promise than a criteria. ]

- [ ] `incident-response`: Commit to responding to and fixing security issues in a timely manner
- [ ] `incident-disclosure`: Commit to disclosing security incidents in a timely manner
- [ ] `incident-post-mortem`: Commit to publishing a post-mortem analysis of any security incident that provides insight into incident causes, and what preventive measures can/should be taken as a result.
