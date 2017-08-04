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
    public Clue add(@RequestBody Clue clue, BindingResult bindingResult){
    	if (clue.getId() == null) {
    		UUIDUtils uuidUtils = new UUIDUtils();
    		clue.setId(uuidUtils.creatUUID());
		}else {
			clue.setId(clue.getId());
		}
        clue.setCreatedBy(clue.getCreatedBy());
        clue.setCreatedTime(clue.getCreatedTime());
        clue.setAuthorName(clue.getAuthorName());
        clue.setContent(clue.getContent());
        clue.setClueName(clue.getClueName());
        clue.setEditStatus(clue.getEditStatus());

        return clueService.add(clue);
    }

    //@RequestMapping("/findById")
    @PostMapping("/findById")
    public Clue findById(@RequestParam String id){
        return clueService.findById(id);
    }

    //上传
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

    @PostMapping("/deleteById")
    public Integer deleteById(@RequestParam String id){
        return clueService.deleteById(id);
    }
}
