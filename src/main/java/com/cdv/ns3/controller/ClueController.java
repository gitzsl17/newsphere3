package com.cdv.ns3.controller;

import com.cdv.ns3.model.Clue;
import com.cdv.ns3.service.ClueService;
import com.cdv.ns3.utils.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ClueController {

    @Autowired
    private ClueService clueService;

    @PostMapping("/findAll")
    public List<Clue> queryClue() {
        return clueService.clueList();
    }

    @PostMapping("/add")
    public Clue add(@Valid Clue clue, BindingResult bindingResult){
        UUIDUtils uuidUtils = new UUIDUtils();
        clue.setId(uuidUtils.creatUUID());

        clue.setCreatedBy(clue.getCreatedBy());
        clue.setCreatedTime(clue.getCreatedTime());
        clue.setAuthorName(clue.getAuthorName());
        clue.setContent(clue.getContent());
        clue.setClueName(clue.getClueName());

        return clueService.add(clue);
    }
}
