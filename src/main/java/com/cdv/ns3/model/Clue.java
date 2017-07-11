package com.cdv.ns3.model;


import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Clue {

    @Id
    private String id;
    private String clueName;
    private String content;
    private String authorName;
    private Date createdTime;
    private String createdBy;

    private Integer editStatus;

    //无参构造
    public Clue(){

    }

    public Integer getEditStatus() {
        return editStatus;
    }

    public void setEditStatus(Integer editStatus) {
        this.editStatus = editStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClueName() {
        return clueName;
    }

    public void setClueName(String clueName) {
        this.clueName = clueName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
