#### 1.3.2 (2016-6-14)

##### Documentation Changes

* **fix:** Fixed endpoint typo ([590c4227](https://github.com/fvdm/nodejs-pastecapi/commit/590c42271a605a5ed453b075c5b1dfa842aa840e))

#### 1.3.1 (2016-6-14)

##### Documentation Changes

* **methods:** Mention ping unavailable at hosted API ([cbed8d8e](https://github.com/fvdm/nodejs-pastecapi/commit/cbed8d8ebd116314346b06f9461b20588967e7a8))
* **configuration:**
  * Mention hosted API for authkey ([171636cd](https://github.com/fvdm/nodejs-pastecapi/commit/171636cd92655689fd9097b2f43f7285f067bd0a))
  * Add indexid setting ([7e331dd1](https://github.com/fvdm/nodejs-pastecapi/commit/7e331dd1b7f2a55fb2e95b76ce4e2490f48d57ef))
  * Clarify configs are examples ([22c96774](https://github.com/fvdm/nodejs-pastecapi/commit/22c967745be3d78167cc2645fed1915cc99ad143))
  * Use object config ([224c6ebc](https://github.com/fvdm/nodejs-pastecapi/commit/224c6ebcd8960a78528c4caeb741ac3422160948))
* **readme:** Add error messages ([6f139bd3](https://github.com/fvdm/nodejs-pastecapi/commit/6f139bd3ead8261f601413ad20fd36400043a856))
* **intro:** Mention opensource and hosted APIs ([4a922837](https://github.com/fvdm/nodejs-pastecapi/commit/4a922837cb4bfc63bdcbcc57aa3b1f6e2680e1a6))

### 1.3.0 (2016-6-13)

##### Chores

* **package:** Update eslint dev dep ([d9a97743](https://github.com/fvdm/nodejs-pastecapi/commit/d9a977435c2848636a8aacd3596fb6693b6e6f55))

##### New Features

* **interface:** Add .config to interface ([2f1858c3](https://github.com/fvdm/nodejs-pastecapi/commit/2f1858c3fc35c06a755846e2885efc9a9070dcce))
* **setup:**
  * Add indexid configuration setting ([3d8d0803](https://github.com/fvdm/nodejs-pastecapi/commit/3d8d080378d743e8e9fba8be6f1131fd68bf0ff1))
  * Allow config object instead of arguments ([5da2b7bb](https://github.com/fvdm/nodejs-pastecapi/commit/5da2b7bb034c0637d2a2e9fcb6809e8117a5d245))

##### Bug Fixes

* **cleanup:** Remove trailing whitespace ([0bddeeed](https://github.com/fvdm/nodejs-pastecapi/commit/0bddeeedb4a365eb317239e61d9f49adad417d23))
* **http:**
  * Ping error only for hosted API ([5b1c1e94](https://github.com/fvdm/nodejs-pastecapi/commit/5b1c1e94c463f8d4ca4b39690816d50cf5bad88b))
  * Catch another authkey error ([7806602f](https://github.com/fvdm/nodejs-pastecapi/commit/7806602faab5d62c7ad301800589c52566dde125))
  * Check options.json existence ([d5562284](https://github.com/fvdm/nodejs-pastecapi/commit/d5562284f9783845e3c7dc46c87f0b1ba173e328))
  * Hosted API does not allow ping ([3b3c320b](https://github.com/fvdm/nodejs-pastecapi/commit/3b3c320ba49d3b214564a147ae0c8f2572c2231a))
  * Fixed path index and invalid authkey error ([edea3fce](https://github.com/fvdm/nodejs-pastecapi/commit/edea3fce11c27aac23754818e92100c0c373a562))
  * Fixed syntax typo) ([ef87698c](https://github.com/fvdm/nodejs-pastecapi/commit/ef87698ca00d377243c551017d57bf6520589ea2))

##### Refactors

* **style:** Restore cleaner returns ([04462f49](https://github.com/fvdm/nodejs-pastecapi/commit/04462f49c5d1357ca87619e40de6361436bfcdd5))

##### Tests

* **style:** Replace const/let with var ([61baf41e](https://github.com/fvdm/nodejs-pastecapi/commit/61baf41e4608286864527eb30162cd5da09bae16))
* **tests:**
  * Run both opensource and hosted APIs ([6fdf6f68](https://github.com/fvdm/nodejs-pastecapi/commit/6fdf6f68dd5e2d6253b287d68ddf0e102275de44))
  * Add Setup with arguments ([887641f5](https://github.com/fvdm/nodejs-pastecapi/commit/887641f5d54b387bb62f945fbd62c624b8283b3d))
* **fix:**
  * warn about invalid authkey response ([3fd33fc2](https://github.com/fvdm/nodejs-pastecapi/commit/3fd33fc228457afeb5280187ea236f384a500cdf))
  * Use writeIndex instead of ping for errors ([4749b050](https://github.com/fvdm/nodejs-pastecapi/commit/4749b050c917a4a6cda2107ef05788726972e67c))
  * Fixed syntax typo ([01d91882](https://github.com/fvdm/nodejs-pastecapi/commit/01d91882d85347ce2aae4340cca5f13179a39d38))
* **setup:** Add PASTEC_INDEXID, use object config ([f7e1f5f1](https://github.com/fvdm/nodejs-pastecapi/commit/f7e1f5f1986ea56a8f50aa32fc283bcbb9510328))

#### 1.2.3 (2016-6-10)

##### Documentation Changes

* **badges:** Fixed dependencies deeplink ([1d885a47](https://github.com/fvdm/nodejs-pastecapi/commit/1d885a47d6702b3cb6f154d5fc928ede3a730c06))

#### 1.2.2 (2016-6-10)

##### Documentation Changes

* **readme:** Clarify configuration syntax ([8d2de9fd](https://github.com/fvdm/nodejs-pastecapi/commit/8d2de9fd8fa06e1c829369e4f99bc4e9958435d4))

#### 1.2.1 (2016-6-10)

##### Documentation Changes

* **readme:** Add configuration section ([51b583fe](https://github.com/fvdm/nodejs-pastecapi/commit/51b583fecb4c176f8f70e5fa76d43c199d7941e6))

### 1.2.0 (2016-6-10)

##### Chores

* **jsdoc:** Describe authkey setting ([2bd3250b](https://github.com/fvdm/nodejs-pastecapi/commit/2bd3250b297a5d8952376b21a5c17e12eb824a83))
* **package:** Update dependency versions ([721c7548](https://github.com/fvdm/nodejs-pastecapi/commit/721c7548a6fc76c288a3707830eeb57ee2fba026))

##### Documentation Changes

* **badges:**
  * Add coverage status ([4ea5f0de](https://github.com/fvdm/nodejs-pastecapi/commit/4ea5f0de33b4915aad64028eea5348bdc12a3154))
  * Deeplink Gemnasium to dependencies tab ([1cf59c05](https://github.com/fvdm/nodejs-pastecapi/commit/1cf59c05efa1ee82cf28c84628eb643a0d57716b))
  * Add npm version for changelog ([dfa280a2](https://github.com/fvdm/nodejs-pastecapi/commit/dfa280a230934ea6a6fbc7405711bb4e8ebd0117))

##### New Features

* **http:** Add authkey support ([cdcde5d2](https://github.com/fvdm/nodejs-pastecapi/commit/cdcde5d273ad28fb71bf4e8befbff97d88f31bd0))

##### Bug Fixes

* **style:** Consistent returns ([219316f7](https://github.com/fvdm/nodejs-pastecapi/commit/219316f79cb5fd7580acfbd0a402a15f4088a42a))
* **main:** Cleaner, consistent returns ([e25e38e8](https://github.com/fvdm/nodejs-pastecapi/commit/e25e38e80d41d0748e3364ea125b51a415678a67))
* **errors:** Catch invalid authkey error ([bf506260](https://github.com/fvdm/nodejs-pastecapi/commit/bf506260c4e5c4f335e0e7efeec5086ccc2927aa))

##### Other Changes

* **undefined:**
  * dependencies badge ([46819656](https://github.com/fvdm/nodejs-pastecapi/commit/46819656131dc7937f4776c4d93a32b20b6c509a))
  * cleaner author line ([54a167d8](https://github.com/fvdm/nodejs-pastecapi/commit/54a167d8bd9530cda8a72bb60424239be42b7d78))
  * updated versions ([55261afa](https://github.com/fvdm/nodejs-pastecapi/commit/55261afa45761be145de9fa884a0e43678bc4f00))
  * always run both test commands ([83170080](https://github.com/fvdm/nodejs-pastecapi/commit/83170080691af86e359131c9e25abf72868f9aed))

##### Refactors

* **cleanup:**
  * Moved processResponse errors to function ([7b9e66ed](https://github.com/fvdm/nodejs-pastecapi/commit/7b9e66edb0bac14003ccbb80db1f55ae7cde591a))
  * Moved talk() response to function ([94e210af](https://github.com/fvdm/nodejs-pastecapi/commit/94e210af3998fd96708449288a378b6969a1f296))

##### Tests

* **fix:**
  * Fixed missing fs module ([0c9f6500](https://github.com/fvdm/nodejs-pastecapi/commit/0c9f650088d09bf69ad1a5b59cf27b01e3d87d6f))
  * Fixed bad ref to errFile ([d6126feb](https://github.com/fvdm/nodejs-pastecapi/commit/d6126feb693d0f184a8129ca58db090e6dc6822e))
  * err.error is an Error instance ([054075db](https://github.com/fvdm/nodejs-pastecapi/commit/054075db4b6d1d1da8da82f44757c888db8bf2a0))
  * Set only two args without authkey ([d4d66631](https://github.com/fvdm/nodejs-pastecapi/commit/d4d6663144f8257f41c5054faae06570d41d164f))
  * All tests should run ([b0b53446](https://github.com/fvdm/nodejs-pastecapi/commit/b0b534469c41bd3bb20dd4a6bbafbd33c36188ff))
  * Fixed incomplete invalid authkey check ([15865eb8](https://github.com/fvdm/nodejs-pastecapi/commit/15865eb88d6bcb82cf552257c6e79cddade18bf2))
* **tests:**
  * Add method searchIndex buffer and error ([44bc5a38](https://github.com/fvdm/nodejs-pastecapi/commit/44bc5a389bd1046bb5f5c7b368a22e7c44445396))
  * Add method addImage - error ([1626192c](https://github.com/fvdm/nodejs-pastecapi/commit/1626192c9028dd79ef83f71228636bcea2cbbbf8))
  * Add method addImage buffer test ([07ee8aec](https://github.com/fvdm/nodejs-pastecapi/commit/07ee8aec999120090cc626e44253eb2915f73a31))
  * Add error request failed for timeout ([f46db0b7](https://github.com/fvdm/nodejs-pastecapi/commit/f46db0b76e995bf7f5482918cc51e54fbacd2c78))
  * Add invalid authkey error test ([60f83acb](https://github.com/fvdm/nodejs-pastecapi/commit/60f83acb0ecdf67267408d81e700c8a94d5b4607))
* **cleanup:** Use doTest test() alias ([ed49936e](https://github.com/fvdm/nodejs-pastecapi/commit/ed49936e8a8432c8d51d798cacef17a15987ad0d))
* **package:** Add coverage deps, test runner ([e04032b2](https://github.com/fvdm/nodejs-pastecapi/commit/e04032b257f2ad8377b12c5b59197929bfff78d6))
* **runner:** Add test.sh runner ([fedcc55b](https://github.com/fvdm/nodejs-pastecapi/commit/fedcc55b6fa1272f21411bf5a0c5bb775bae82ae))
* **script:** Add PASTEC_AUTHKEY env var ([0b3b2b12](https://github.com/fvdm/nodejs-pastecapi/commit/0b3b2b12a9a1741e3bdeb073ceb167ed72931532))
* **undefined:** add node v6 to Travis config ([673b41dc](https://github.com/fvdm/nodejs-pastecapi/commit/673b41dcde6e3077a9a433989df750f08beeea76))

