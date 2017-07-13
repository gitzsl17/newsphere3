package com.cdv.ns3.service;

import com.cdv.ns3.model.Clue;
import com.cdv.ns3.repository.ClueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ClueService {

    @Autowired
    private ClueRepository clueRepository;

    public List<Clue> clueList(){
        return clueRepository.findAll();
    }

    public Clue add(Clue clue){
        return clueRepository.save(clue);
    }

    public Clue findById(String id){
        return clueRepository.findClueById(id);
    }

    public Clue update(Clue clue){
        return clueRepository.saveAndFlush(clue);
    }

    public Integer deleteById(String id){
        return clueRepository.deleteById(id);
    }

}
