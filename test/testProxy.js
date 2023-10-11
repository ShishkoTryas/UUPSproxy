const hre = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("TestProxy", async function() {
    async function deployFixture() {
        const [user1, user2] = await hre.ethers.getSigners();
        const simpleBoxContract = await hre.ethers.deployContract("SimpleBox");
        const proxyContract = await hre.ethers.deployContract("UUPSProxy", [await simpleBoxContract.getAddress()]);

        return {user1, user2, simpleBoxContract, proxyContract};
    }

    it("should deploy", async function() {
        const {simpleBoxContract, proxyContract} = await loadFixture(deployFixture);
        console.log("simpleBoxContract deploy at address: ", await simpleBoxContract.getAddress())
        expect(await simpleBoxContract.getAddress()).to.exist;
        console.log("proxyContract deploy at address: ", await proxyContract.getAddress())
        expect(await proxyContract.getAddress()).to.exist;
    });

    it("should delegate", async function(){
        const {simpleBoxContract, proxyContract} = await loadFixture(deployFixture);
        const proxyBox = await simpleBoxContract.attach(proxyContract);
        await proxyBox.setA(11);
        console.log("Proxy Storage A: ", await proxyBox.getA())
        console.log("SimpleBox Storage A: ", await simpleBoxContract.getA())
        expect(await proxyBox.getA()).to.equal(11);
    });

    it('should set up the correct owner', async function () {
        const {user1, user2, simpleBoxContract, proxyContract} = await loadFixture(deployFixture);
        const proxyBox = await simpleBoxContract.attach(proxyContract);
        console.log("Owner before init: ", await proxyBox.owner());
        await proxyBox.connect(user1).init();
        console.log("Owner after init: ", await proxyBox.owner());
        expect(await proxyBox.owner()).to.equal(await user1.getAddress());
    });

    it('should revert when the function is repeated', async function () {
        const {user1, user2, simpleBoxContract, proxyContract} = await loadFixture(deployFixture);
        const proxyBox = await simpleBoxContract.attach(proxyContract);

        await proxyBox.connect(user1).init();

        await expect(proxyBox.connect(user2).init()).to.be.reverted;
    });

    it('should not the owner who renews the contract',async function () {
        const { user1, user2, simpleBoxContract, proxyContract } = await loadFixture(deployFixture);
        const proxyBox = simpleBoxContract.attach(proxyContract);
        const simpleBox2 = await hre.ethers.deployContract("SimpleBox2");
        await expect(proxyBox.connect(user2).updateCode(await simpleBox2.getAddress())).to.be.reverted;
        await proxyBox.connect(user1).init();
        await expect(proxyBox.connect(user2).updateCode(await simpleBox2.getAddress())).to.be.reverted;
    });

    it('should update contract',async function () {
        const { user1, user2, simpleBoxContract, proxyContract } = await loadFixture(deployFixture);
        const proxyBox = await simpleBoxContract.attach(proxyContract);
        const slot = await hre.ethers.getBigInt(hre.ethers.stripZerosLeft(hre.ethers.keccak256(hre.ethers.toUtf8Bytes("eip1967.proxy.implementation")) - 1));
        const initialAddress = await hre.ethers.provider.getStorage(await proxyBox.getAddress(), slot);
        expect(initialAddress).to.be.equal(await simpleBoxContract.getAddress());
        const simpleBox2 = await hre.ethers.deployContract("SimpleBox2");
    });
});