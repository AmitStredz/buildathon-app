# ELna - Decentralized Medical History and Personal Data Storage Platform

### Project Description
ELna is a decentralized platform built on the Internet Computer (ICP) blockchain that allows users to securely store and manage their medical history and personal data. Users can upload and update daily life activities including text, photos, voice notes, PDFs, medical reports, and more. These data files are stored on IPFS (InterPlanetary File System), and their IPFS hash keys are stored on the ICP blockchain via smart contracts, ensuring security, privacy, and immutability.

### Key Features
- Data Upload: Users can upload various types of data such as text, images, voice notes, PDFs, and medical reports.
+ IPFS Integration: All data is stored on IPFS, which provides decentralized storage.
* Smart Contracts on ICP: The hash of the data stored on IPFS is securely stored on the ICP blockchain through smart contracts to ensure data integrity and privacy.
- Data Security & Privacy: Leveraging ICP's decentralization and cryptography ensures that sensitive personal and medical data remains in the user's control without any central authority having access to or control over it.

### Why ICP Blockchain?
The main reason for integrating the ICP blockchain into ELna is due to the need for high-level data security and privacy. This project deals with extremely sensitive personal and medical information that cannot be risked by entrusting it to any organization or centralized entity. Decentralization through the ICP blockchain ensures that no single entity has control over users' personal data, providing unmatched security, privacy, and transparency. This aligns with the goals of Web3, where individuals are in control of their own data.

## **Smart Contract Integration on ICP Blockchain**
ELna uses the Internet Computer’s (ICP) decentralized smart contracts to store the IPFS hash of user data securely on-chain. Here's how we integrated ICP blockchain into the project:

1. IPFS Storage: After a user uploads any form of data (text, image, voice note, etc.), the data is first uploaded to IPFS, and the resulting IPFS hash (which uniquely identifies the file) is returned.

2. Smart Contract Deployment: The IPFS hash is then passed to a smart contract deployed on the ICP blockchain, which securely stores the hash on-chain. This hash acts as a reference to the file, ensuring that the file's integrity and existence can always be verified.

    - Smart Contract File: The interface for the ICP smart contract is defined in the `.did` (Candid Interface Definition) file, located at:

    ```/backend/src/declarations/ccid_tracker/ccid_tracker.did```
3. Interaction with Smart Contract: The smart contract on ICP is responsible for storing and retrieving the IPFS hash:

    - The method `add` stores the IPFS hash for a given data entry.
    - The method `get` retrieves the IPFS hash based on the user’s request.
    Example of the smart contract integration can be found in:

    ```/frontend/src/components/VoiceRecorder.js```


## **Deployment on ICP Blockchain**
ELna is fully deployed on the Internet Computer (ICP) blockchain, enabling it to leverage the decentralization and security features offered by the ICP network. This deployment ensures that the platform is scalable, immutable, and protected from central control.

- Canister ID: The project is hosted on an ICP canister, which handles the smart contract execution.
+ ICP Smart Contract: The smart contract stores users’ IPFS hashes, ensuring that the data is only accessible to the owner of the hash and never controlled by a third party.

## **Code Breakdown**
+ Frontend Integration: The frontend of this project, built using React, includes a voice recorder feature that captures user inputs, uploads the file to IPFS, and interacts with the ICP smart contract to store the IPFS hash. Key files:

    - Voice Recorder Component:
        ```frontend/src/components/VoiceRecorder.js```
+ Smart Contract (IDL) Definition:
The `.did` file contains the interface definition for the smart contract interaction.

    - IDL (Candid) File:
        ```backend/src/declarations/ccid_tracker/ccid_tracker.did```

## **Technology Stck**
- Frontend: React
- Backend: ICP Smart Contracts, IPFS for file storage
- Blockchain: Internet Computer (ICP)
- Data Storage: IPFS (InterPlanetary File System)

## **How to Run the Project Locally**
1. Cone the repository:
```
git clone https://github.com/your-repo/elna.git
cd elna
```

2. Install Dependencies:
```
npm install
```
3. Start Local Development Environment: Ensure `dfx` is installed and set up. Then, run:
```
dfx start
```
4. Deploy Smart Contract Locally:
```
dfx deploy
```
5. Run the Frontend:
```
npm start
```