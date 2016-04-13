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

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import javax.ws.rs.core.Link;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import javax.ws.rs.core.UriBuilder;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import org.iproduct.polling.entity.Alternative;
import static org.iproduct.polling.resources.utils.LinkRelations.SELF;
import static org.iproduct.polling.resources.utils.LinkRelations.VOTE;

/**
 * Resource class for {@link org.iproduct.polling.model.Alternative Alternative} resources
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
@XmlRootElement(name="alternative")
@XmlAccessorType(XmlAccessType.FIELD)
public class AlternativeRepresentation {
    private Long id;
    private String text;
    private int position;
    private int votes = 0;
    @XmlElement(name="_links")
    @XmlJavaTypeAdapter(LinkMapAdapter.class)
    private Map<String, LinkRepresentation> links = new LinkedHashMap<>();

    public AlternativeRepresentation() {
    }

    public AlternativeRepresentation(Alternative alt, Collection<Link> linksArg) {
        id = alt.getId();
        text = alt.getText();
        position = alt.getPosition();
        votes = alt.getVotes().size();
        if(linksArg != null){
            linksArg.stream().forEachOrdered((Link link) -> {
                links.put(link.getRel(), new LinkRepresentation(link));
            });
        }
        if(links.get(SELF) != null)
            links.put(VOTE, new LinkRepresentation(
                Link.fromUriBuilder(
                    UriBuilder.fromUri(links.get(SELF).getHref()).path("votes"))
                        .rel(VOTE).title("Vote for alternative").type(APPLICATION_JSON)
                        .build()) );
    } 

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getVotes() {
        return votes;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public Map<String, LinkRepresentation> getLinks() {
        return links;
    }

    public void setLinks(Map<String, LinkRepresentation> links) {
        this.links = links;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 67 * hash + Objects.hashCode(this.id);
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
        final AlternativeRepresentation other = (AlternativeRepresentation) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "AlternativeRepresentation{" + "id=" + id + ", text=" + text 
                + ", position=" + position + ", votes=" + votes
                + ", links=" + links + '}';
    }

    
}
