# Maintainer Covenant

This document provides the criteria by which you should expect to hold the maintainers of this project accountable. Please note, however, this is not intended to be legally binding in any way. Rather, it is intended to aid people interested in assessing the overall integrity and security of this project.

This is not intended to be legally binding. It is not a contract and provides no warranties. Rather, it is intended to provide a means by which the security of this project, and any associated risks that result from depending on this project, may be evaluated.

Constructive criticism is encouraged, and may be submitted [here](./issues/).

## Definitions

&#x1fa84; "**Maintainer**": A person(s) responsible for the integrity of a project and associated community

&#x1fa84; "**Criteria**": Measurable metrics by which a project may be assessed

&#x1fa84; "**Secret**": login/passwords, access tokens, API keys, or other credentials that may be used to access sensitive information.

&#x1fa84; "**Local device**": laptop, phone, tablet, or other device that may be lost, stolen, or otherwise accessed by someone other than the maintainer

## Team

**Criteria**

- `bus-factor`: To mitigate the "[bus factor](https://en.wikipedia.org/wiki/Bus_factor)" risk, projects are expected to have 2 or more maintainers
- `trusted-maintainers`: To mitigate bad-actor risk, maintainers are expected to verifiably reputable and trust-worthy members of the community.
- `active-team`: To mitigate risks that come from an oversize team, maintainers who have not engaged with the project in 12 months should have their maintainer privileges revoked

**Status**

|                          |                           |
| ------------------------ | ------------------------- |
| Christoph Tavan, @ctavan | Google                    |
| Robert Kieffer, @broofa  | Google, Facebook, CodePen |

## Data

**Criteria**

- `secure-production-secrets`: All production "secrets" to be encrypted and maintained in secure locations
- `no-passwords-in-repo`: No passwords or secrets in source repository

## Accounts

**Criteria**

- `2fa-enabled`: All maintainers to have 2FA enabled for any project-sensitive logins
- `generated-passwords`: Passwords to be unique and randomly generated for each account
- `no-shared-accounts`: Maintainers do not share account information. I.e. maintainer access can be managed via roles and permissions.
- `no-local-secrets`: Secrets should not be kept on local devices
- `managed-local-secrets`: Where necessary secrets on local devices to be kept in a secure, reputable password manager (e.g. 1Password, LastPass)

**Status**:

The following services are currently used by this project:

| Service      | 2FA-required | Secrets | Purpose        |
| ------------ | ------------ | ------- | -------------- |
| Github       | &check;      | &check; | source control |
| NPMJS.org    | &check;      | &check; | publication    |
| BrowserStack | &check;      | &check; | CI testing     |

This project uses the following services. Checked accounts are only accessible by team members who have 2-Factor authentication enabled 2-Factor authentication

## Incident Response

TODO: These criteria aren't exactly measurable. :-/

Criteria:

- `incident-response`: Commit to responding to and fixing security issues in a timely manner
- `incident-disclosure`: Commit to disclosing security incidents in a timely manner
- `incident-post-mortem`: Commit to publishing a post-mortem analysis of any security incident that provides insight into incident causes, and what preventive measures can/should be taken as a result.
