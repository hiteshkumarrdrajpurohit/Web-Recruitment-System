package com.sunbeam.entity;



import java.time.LocalDateTime;

import com.sunbeam.entity.types.InterviewStatus;
import com.sunbeam.entity.types.InterviewType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "interviews")

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Interview  extends BaseEntity {
   
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;
    
    private String interviewerName;
    
    @Column(nullable = false)
    private LocalDateTime scheduledDateTime;
    
    @Enumerated(EnumType.STRING)
    private InterviewType type; // PHONE, VIDEO, IN_PERSON
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InterviewStatus status; // SCHEDULED, COMPLETED, CANCELLED, 
    // RESCHEDULED
    
    @Column(columnDefinition = "TEXT")
    private String feedback;

    private String meetUrl;
        
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "createdBy", nullable = false)
    private HrManager hrManager;

}
