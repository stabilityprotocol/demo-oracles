// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Oracle {
    mapping(string => string) public oracleValues;

    event ValueSet(string key, string value);


    function setValue(string memory key, string memory value) public  {
        require(bytes(key).length > 0, "Key cannot be empty");
        require(bytes(value).length > 0, "Value cannot be empty");
        oracleValues[key] = value;
        emit ValueSet(key, value);
    }
}