/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2003-2014 IPT - Intellectual Products & Technologies.
 * All rights reserved.
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 with Classpath Exception only ("GPL"). 
 * You may use this file only in compliance with GPL. You can find a copy 
 * of GPL in the root directory of this project in the file named LICENSE.txt.
 *
 * When distributing the software, include this License Header Notice in each
 * file and include the GPL file named LICENSE.txt in the root directory of 
 * the project.
 *
 * GPL Classpath Exception:
 * IPT - Intellectual Products & Technologies (IPT) designates this particular 
 * file as subject to the "Classpath" exception as provided by IPT in the GPL 
 * Version 2 License file that accompanies this code.
 *
 * Modifications:
 * If applicable, add the following below the License Header, with the fields
 * enclosed by brackets [] replaced by your own identifying information:
 * "Portions Copyright [year] [name of copyright owner]"
 *
 */
package org.iproduct.polling.entity;

import java.io.Serializable;

import java.util.Date;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.TableGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
@Entity
@XmlRootElement
@XmlAccessorType(javax.xml.bind.annotation.XmlAccessType.FIELD)
public class Vote implements Serializable {

    @TableGenerator(name = "vote_gen",
            table = "id_gen",
            pkColumnName = "GEN_KEY",
            valueColumnName = "GEN_VALUE",
            pkColumnValue = "vote_id",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "vote_gen")
    @NotNull
    @Basic(optional = false)
    @Column(updatable = false, insertable = true, nullable = false)
    private Long id;

    @NotNull
    @Size(min = 1, max = 255)
    @Basic(optional = false)
    @Column(unique = false, updatable = true, insertable = true, nullable = false, length = 255)
    private String email;
    
    @Column(name = "vote_time", unique = false, updatable = true, insertable = true, 
            nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    private Date voteTime = new Date();

    @XmlTransient
    @NotNull
    @ManyToOne(optional = false, targetEntity = Alternative.class)
    private Alternative alternative;

    public Vote() {}

    public Vote(String email, Alternative alternative) {
        this.email = email;
        this.alternative = alternative;
    }

    public Date getVoteTime() {
        return this.voteTime;
    }

    public void setVoteTime(Date voteTime) {
        this.voteTime = voteTime;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Alternative getAlternative() {
        return this.alternative;
    }

    public void setAlternative(Alternative alternative) {
        this.alternative = alternative;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 73 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Vote other = (Vote) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Vote{" + "voteTime=" + voteTime + ", id=" + id + ", email=" 
                + email 
                + (alternative != null ? ", alternativeId=" + alternative.getId() : "")
                + '}';
    }

}
