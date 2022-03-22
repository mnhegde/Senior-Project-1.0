import java.util.*;

public class Main {

    ArrayList<Block> blockchain = new ArrayList<Block>(); 
    public static void main (String[] args) {
        String[] genesisTransactions = {"example message", "hello world", "1000 bitcoin sent"}; //in real version, this would be transaction class
        Block genesisBlock = new Block(0, genesisTransactions);

        String[] block2Transactions = {"other example message", "test message", "5000 bitcoin sent"};
        Block block2 = new Block(genesisBlock.getBlockHash(), block2Transactions);

        String[] block3Transactions = {"block 3 hash", "1 bitcoin sent"};
        Block block3 = new Block(block2.getBlockHash(), block3Transactions);

        System.out.println("Hash of Genesis Block:");
        System.out.println(genesisBlock.getBlockHash());
        System.out.println("Hash of Block 2:");
        System.out.println(block2.getBlockHash());
        System.out.println("Hash of Block 3:");
        System.out.println(block3.getBlockHash());

        //Key Concept:
        //If anything in Genesis Block is changed, it will be reflected in the hash for Block 2 and Block 3
        //This shows the nature of the "chain", as the change to one block will propagate through rest of the chain

        //Blockchain is similar to linked list
        /*
        Blockchain is both a data structure and overarching protocol that encapsulates consensus algorithms, smart contracts, and 
        proof of methods to determine how nodes validate blocks, mine for new blocks, and manipulate data for users
        */
    }
}