package com.cdv.ns3.rs.impl;

import com.cdv.ns3.model.Clue;
import com.cdv.ns3.rs.ClueRS;

public class ClueRSimpl implements ClueRS {
    @Override
    public Clue queryClue(String id) {

        Clue clue = new Clue();
        return clue;
    }

    @Override
    public void deleteClue(String id) {

    }

    @Override
    public Clue addClue(String id) {
        return null;
    }
}
