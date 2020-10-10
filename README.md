# Summary
The canonical flutter counter app implemented as a DApp on the Algorand Blockchain

# Pre-requisites
1. You have installed `flutter` (installation instructions are available at https://flutter.dev/docs/get-started/install).  In order to interact with the Algorand blockchain, you need to connect to a node runner.  A simple way to do this is to use purestake, which allows you to connect XYZ
2. You have installed the [AlgoSigner](https://www.purestake.com/technology/algosigner/) chrome extension, which *must* be installed and configured to execute the smart contract configured in this tutorial.  If you want to run this example on Algorand MainNet, you need to fund your wallet.  If you want to run this example on Algorand TestNet, you can fund your wallet using the Algorand TestNet faucet [here](https://bank.testnet.algorand.network/)
3. You have a way to test and compile PyTeal contracts.  I use Algorand Studio for this, which you can download [here](https://github.com/ObsidianLabs/AlgorandStudio/releases)
4. You have a free account with [Purestake](https://developer.purestake.io/).  You need to put your own API key into the DApp in order to run this as an example locally.  We use the Purestake api to query the Algorand blockchain.

**IMPORTANT NOTE**: although flutter is a multi-platform framework that supports building to Android, iOS, web, macos, and Windows using the same code, this project *must* be build for the web because we make javascript calls from dart code to interact with the AlgoSigner chrome extension.  REFINE: This allows us to demonstrate how having to write additional code to manage a wallet and interact with the Algorand blockchain.

## Step 1: Project setup
1. Create a new directory `flutter_algorand_counter`, open the directory in terminal and run `flutter create .` to create a starter project in Flutter.
2. Within the `flutter_algorand_counter` create a folder called `contracts`.  This is where we will write our simple counter contract.
3. Execute `flutter run -d chrome` to test that the starter app is working as expected (you may need to run `flutter devices` to see a list of available devices if this doesn't work)

## Step 2: Designing the counter app to run as a DApp on Algorand
At this stage, the state of the counter variable in the app (`lib/main.dart`) is changed in the `_incrementCounter()` private method within `_MyHomePageState`.  Whenever the flutter app is restarted, the counter is re-initialized to 0.  Each instance of the application has it's own private counter.
```dart
  void _incrementCounter() {
    setState(() {  // state set through a local function call for each device and session
      _counter++;
    });
  }
```

#### Defining the problem
Let's assume that we wanted the counter value to be persisted and synchronized for all users.  That is, our requirements are:
1. Users can only change the value of the the counter by incrementing it (i.e. not by assigning an arbitrary value)
2. There is no super-user that can alter the value of the counter (thereby corrupting the true count of app user submissions)
3. Users are able to access the global state of the counter value in the app

#### Solution
We could create a database to hold the value of the counter and make a network call to retrieve the value, thereby synchronizing the state of the counter variable between all users, but this methodology has some drawbacks:
1. We would need to provision a database and infrastructure to run it
2. We would have to create a mechanism to ensure credentials to write to the database could not be obtained by a malicious actor
3. We couldn't guarantee that the database owner wouldn't unilaterally alter the data in the database now or at any point in the future

With a public, permissionless blockchain we can ensure that the value of the counter can only be altered by running a smart contract.  This is an elegant solution because it guarantees that the only way anyone can change the value of the counter is by calling the smart contract.  While this is a very simple smart contract, being able to trust a smart contract is a powerful idea with many potential applications.

#### Implementing the solution
To demonstrate the solution, we will upgrade the canonical flutter counter app to display two values:
1. The local counter state
2. The state of the counter on the Algorand blockchain

## Step 3: Building the upgraded counter app
Crte


Update `pubspec.yaml` to include the `dart_algorand` library.
```
dependencies:
  flutter:
    sdk: flutter
  dart_algorand: ^0.9.7
```
