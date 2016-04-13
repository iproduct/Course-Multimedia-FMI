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
package org.iproduct.polling.representations;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.ws.rs.core.Link;
import javax.ws.rs.core.Link.JaxbAdapter;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import org.iproduct.polling.entity.Alternative;
import org.iproduct.polling.entity.Poll;
import org.iproduct.polling.entity.PollStatus;

/**
 * Resource class for {@link org.iproduct.polling.model.Alternative Alternative} resources
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="poll")
public class PollRepresentationHeaderLinks {
    private Long id;
    private PollStatus status = PollStatus.CREATED;
    private String title;
    private String question;
    private Date start;
    private Date end;
    @XmlElementWrapper(name = "_embedded")
    @XmlElement(name = "alternative")
    private List<Alternative> alternatives;

    public PollRepresentationHeaderLinks() {
    }

    public PollRepresentationHeaderLinks(Poll poll) {
        id = poll.getId();
        status = poll.getStatus();
        title = poll.getTitle();
        question = poll.getQuestion();
        start = poll.getStart();
        end = poll.getEnd();
        alternatives = (poll.getAlternatives().size() > 0)?
                poll.getAlternatives() : null;
    } 

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PollStatus getStatus() {
        return status;
    }

    public void setStatus(PollStatus status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public List<Alternative> getAlternatives() {
        return alternatives;
    }

    public void setAlternatives(List<Alternative> alternatives) {
        this.alternatives = alternatives;
    }

    @Override
    public int hashCode() {
        int hash = 5;
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
        final PollRepresentationHeaderLinks other = (PollRepresentationHeaderLinks) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PolllRepresentation{" + "id=" + id + ", status=" + status 
                + ", title=" + title + ", question=" + question + ", start=" 
                + start + ", end=" + end + ", alternatives=" + alternatives + '}';
    }

    
}
