package com.cdv.ns3.utils;

import java.util.UUID;

public class UUIDUtils {
    public String creatUUID() {
        return UUID.randomUUID().toString().replace("-","");
    }

    /*public static void main(String[] args) {
        String str = UUIDUtils.creatUUID();
        System.out.println(str);
    }*/
}
