package com.cdv.ns3.controller;

import com.cdv.ns3.model.Clue;
import com.cdv.ns3.service.ClueService;
import com.cdv.ns3.utils.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public Clue add(@Valid Clue clue, @RequestBody Clue clue2, BindingResult bindingResult){
        UUIDUtils uuidUtils = new UUIDUtils();
        clue2.setId(uuidUtils.creatUUID());

        clue2.setCreatedBy(clue2.getCreatedBy());
        clue2.setCreatedTime(clue2.getCreatedTime());
        clue2.setAuthorName(clue2.getAuthorName());
        clue2.setContent(clue2.getContent());
        clue2.setClueName(clue2.getClueName());
        clue2.setEditStatus(clue2.getEditStatus());

        return clueService.add(clue2);
    }
}
