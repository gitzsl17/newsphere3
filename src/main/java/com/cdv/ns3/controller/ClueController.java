package com.cdv.ns3.controller;

import com.cdv.ns3.model.Clue;
import com.cdv.ns3.service.ClueService;
import com.cdv.ns3.utils.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ClueController {

    @Autowired
    private ClueService clueService;

    /**
     * 查找所有
     * @return List
     */
    @PostMapping("/findAll")
    public List<Clue> queryClue() {
        return clueService.clueList();
    }


    /**
     * 新增
     * @return Clue
     */
    @PostMapping("/add")
    public Clue add(@RequestBody Clue clue2, BindingResult bindingResult){
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

    @PostMapping("/delete")
    public Clue delete(@RequestParam String id){
        return null;
    }

    @RequestMapping("/findById")
    public Clue findById(@RequestParam String id){
        return clueService.findById(id);
    }

    @PostMapping("/update")
    public Clue update(@RequestBody Clue clue){
        clue.setId(clue.getId());
        clue.setClueName(clue.getClueName());
        clue.setCreatedTime(clue.getCreatedTime());
        clue.setContent(clue.getContent());
        clue.setCreatedBy(clue.getCreatedBy());
        clue.setEditStatus(clue.getEditStatus());
        clue.setAuthorName(clue.getAuthorName());

        return clueService.update(clue);
    }

    @RequestMapping("/deleteById")
    public Integer deleteById(@RequestParam String id){
        return clueService.deleteById(id);
    }
}
