package com.finverse.transaction.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.finverse.transaction.model.Transaction;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {


    List<Transaction> findBySenderAccount(String senderAccount);

    List<Transaction> findByReceiverAccount(String receiverAccount);

    List<Transaction> findBySenderAccountOrReceiverAccount(String senderAccount, String receiverAccount);
}
