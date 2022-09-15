// SPDX-License-Identifier: Unlicensed

pragma solidity>0.8.4;

contract RegistryFactory {
    address[] public deployedRegistry;

    event RegistryCreated(
         uint documentNumber,
       address indexed owner,
        address RegistryAddress,
        string imgURI,
        uint indexed timestamp,
        string indexed category
    );

    function createRegistry(
        uint documentNumber, 
        string memory imgURI, 
        string memory category,
        string memory storyURI) public
    {

        Registry newRegistry = new Registry(
            documentNumber, imgURI, storyURI,msg.sender);
        

        deployedRegistry.push(address(newRegistry));

        emit RegistryCreated(
           documentNumber,
            msg.sender, 
            address(newRegistry),
            imgURI,
            block.timestamp,
            category
        );

    }
}


contract Registry {
    uint public documentNO;
   string public image;
    string public documentInformation;
    address payable public owner;
    

    // event donated(address indexed donar, uint indexed amount, uint indexed timestamp);

    constructor(
        uint documentNumber , 
        string memory imgURI,
        string memory storyURI,
        address RegistryOwner
        
    ) {
         documentNO= documentNumber;
        image = imgURI;
         documentInformation = storyURI;
       owner=payable(RegistryOwner);
    }

    
}

