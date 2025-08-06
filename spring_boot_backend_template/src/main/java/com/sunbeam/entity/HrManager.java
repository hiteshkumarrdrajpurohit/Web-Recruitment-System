package com.sunbeam.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "hrManager")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class HrManager extends BaseEntity{

@Column(name="dept_name",nullable=false)
private String departmentName;

@OneToOne
@JoinColumn( name= "user_id", nullable=false)
private User user;

@OneToMany(mappedBy = "hrManager", 
			cascade = CascadeType.ALL, orphanRemoval = true)

private List<Interview> interviewList = new ArrayList<>();


@OneToMany(mappedBy = "hrManager", 
			cascade = CascadeType.ALL, orphanRemoval = true)

private List<Vacancy> vacanciesList = new ArrayList<>();


@OneToMany(mappedBy = "hrManager", 
			cascade = CascadeType.ALL, orphanRemoval = true)

private List<Hirings> hiringsList = new ArrayList<>();


}
