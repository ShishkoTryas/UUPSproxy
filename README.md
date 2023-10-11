## Solidity Smart Contract UUPS Proxy

### Contract Details

The primary contract of interest in this project is `UUPSProxy.sol`. This contract is an upgradeable proxy that adheres to the UUPS (Universal Upgradeable Proxy Standard) and allows for seamless contract upgrades.

- **UUPSProxy.sol**: This contract is the main proxy contract that forwards function calls to an implementation contract. It follows the UUPS standard to facilitate upgrades. It also implements the Ownable pattern to manage ownership, and it can be initialized using an `initialize` function.

- **SimpleBox.sol**: This is a simple implementation contract designed for testing the `UUPSProxy` functionality. It contains basic state variables and functions to demonstrate proxy upgrades.

- **Ownable.sol**: This is a separate contract that provides ownership functionality to the `UUPSProxy` contract. It ensures that only the owner can execute administrative functions like upgrading the proxy's implementation contract.

- **Initialization.sol**: This contract is used for the initialization of state variables in the `UUPSProxy` contract. It includes an `initialize` function that sets the initial state of the proxy.
