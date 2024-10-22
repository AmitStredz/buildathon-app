# Baymax - Decentralized Medical History and Personal Data Storage Platform

### Project Description

Baymax is a decentralized platform built on the Internet Computer (ICP) blockchain that allows users to securely store and manage their medical history and personal data. Users can upload and update daily life activities including text, photos, voice notes, PDFs, medical reports, and more. These data files are stored on IPFS (InterPlanetary File System), and their IPFS hash keys are stored on the ICP blockchain via smart contracts, ensuring security, privacy, and immutability.

### Key Features

- Data Upload: Users can upload various types of data such as text, images, voice notes, PDFs, and medical reports.

* IPFS Integration: All data is stored on IPFS, which provides decentralized storage.

- Smart Contracts on ICP: The hash of the data stored on IPFS is securely stored on the ICP blockchain through smart contracts to ensure data integrity and privacy.

* Data Security & Privacy: Leveraging ICP's decentralization and cryptography ensures that sensitive personal and medical data remains in the user's control without any central authority having access to or control over it.

### Why ICP Blockchain?

The use case for integrating ICP blockchain and web3 is centered around data security and privacy. Given the sensitive nature of personal and medical information, central control over such data poses a significant risk. Decentralization through the ICP blockchain ensures that no single organization controls the data, thereby eliminating concerns of unauthorized access or misuse.

## **Smart Contract & ICP Integration**

The core of the platform relies on a smart contract deployed on the ICP blockchain. This smart contract interacts with:

1. **IPFS:** After a user uploads any form of data (text, image, voice note, etc.), the data is first uploaded to IPFS, and the resulting IPFS hash (which uniquely identifies the file) is returned.

2. **ELnaAI:** to generate curated responses based on the user's stored data.

   - Smart Contract File: The interface for the ICP smart contract is defined in the `.did` (Candid Interface Definition) file, located at:
     `/backend/src/declarations/ccid_tracker/ccid_tracker.did`

3. Interaction with Smart Contract: The smart contract on ICP is responsible for storing and retrieving the IPFS hash:

   - The method `add` stores the IPFS hash for a given data entry.
   - The method `get` retrieves the IPFS hash based on the user’s request.
     Example of the smart contract integration can be found in:
     `/src/components/voiceBot.js`

## **ELna AI Chat-Widget Integration**
As part of the project, we have integrated a custom chat-widget based on the original ELna AI chat-widget. The widget has been modified to suit our needs and packaged for easy implementation in the platform.

You can find the repository for the chat-widget here:

ELna AI Chat-Widget Repository: 
```
https://github.com/amalendu123/chat-widget.git
```


<!-- ## **Deployment on ICP Blockchain**

Baymax is fully deployed on the Internet Computer (ICP) blockchain, enabling it to leverage the decentralization and security features offered by the ICP network. This deployment ensures that the platform is scalable, immutable, and protected from central control.

- Canister ID: The project is hosted on an ICP canister, which handles the smart contract execution.

* ICP Smart Contract: The smart contract stores users’ IPFS hashes, ensuring that the data is only accessible to the owner of the hash and never controlled by a third party.

## **Code Breakdown**

- Frontend Integration: The frontend of this project, built using NextJs, includes a voice recording feature that captures user inputs, uploads the file to IPFS, and interacts with the ICP smart contract to store the IPFS hash. Key files:

  - Voice Recorder Component:
    `/src/components/voiceBot.js`

- Smart Contract (IDL) Definition:
  The `.did` file contains the interface definition for the smart contract interaction.

      - IDL (Candid) File:
          ```backend/src/declarations/ccid_tracker/ccid_tracker.did``` -->

## **Technology Stack**

- Frontend: NextJs
- Backend: ICP Smart Contracts, IPFS for file storage
- Blockchain: Internet Computer (ICP)
- Data Storage: IPFS (InterPlanetary File System)

## **How to Run the Project Locally**

1. Cone the repository:

```
git clone https://github.com/AmitStredz/buildathon-app.git
cd buildathon-app
```

2. Install Dependencies:

```
npm install
```

3. Start Local Development Environment: Ensure `dfx` is installed and set up. Then, run:

```
dfx start --playground
```

4.Build the Canisters: This will compile the smart contracts (canisters):

```
dfx build
```

5. Deploy Smart Contract Locally:

```
dfx deploy
```

6. Run the Frontend:

```
npm run dev
```
