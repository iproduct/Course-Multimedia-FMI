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

import java.lang.Long;
import java.util.List;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import static javax.persistence.FetchType.EAGER;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.TableGenerator;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
@Entity
@XmlRootElement
@XmlAccessorType(javax.xml.bind.annotation.XmlAccessType.FIELD)
public class Alternative implements Serializable {

    @TableGenerator(name = "alt_gen",
            table = "id_gen",
            pkColumnName = "GEN_KEY",
            valueColumnName = "GEN_VALUE",
            pkColumnValue = "alt_id",
            allocationSize = 1
    )
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "alt_gen")
    @Basic(optional = false)
    @Column(updatable = false, insertable = true, nullable = false)
    private Long id;

    @Column(unique = false, updatable = true, insertable = true, nullable = false, length = 255)
    @Basic
    @Size(min = 1, max = 255)
    @NotNull
    private String text;

    @Column(unique = false, updatable = true, insertable = true, nullable = false)
    @Basic(optional = false)
    @NotNull
    private int position;

    @XmlTransient
    @ManyToOne(optional = false, targetEntity = Poll.class)
    @NotNull
    private Poll poll;

    @OneToMany(cascade = {CascadeType.ALL}, targetEntity = Vote.class, mappedBy = "alternative",
        fetch = EAGER )
    private List<Vote> votes;

    public Alternative() {

    }

    public Alternative(String text, int position, Poll poll) {
        this.text = text;
        this.position = position;
        this.poll = poll;
    }

    public List<Vote> getVotes() {
        return this.votes;
    }

    public void setVotes(List<Vote> votes) {
        this.votes = votes;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getPosition() {
        return this.position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public Poll getPoll() {
        return this.poll;
    }

    public void setPoll(Poll poll) {
        this.poll = poll;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.id);
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
        final Alternative other = (Alternative) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Alternative{" + "id=" + id + ", text=" + text + ", position=" 
                + position 
                + (poll != null ? ", pollId=" + poll.getId() : "")
                + ", votes=" + votes + '}';
    }

}
