package com.cdv.ns3.repository;


import com.cdv.ns3.model.Clue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClueRepository extends JpaRepository<Clue,Integer> {

    //根据id查找线索
    public Clue findClueById(String id);

    public Integer deleteById(String id);
}
