package com.cdv.ns3.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Demo {

    @GetMapping(value = "/demo")
    public String sayHi(@RequestParam(value = "name",required = false,defaultValue = "张三") String name){
        return "Hi" + name;
    }

}
