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
 */
package org.iproduct.polling.resources.utils;

/**
 * Some standard and custom Link Relations according to
 * <a href="http://tools.ietf.org/html/rfc5988">RFC 5988</a> and
 * <a href="http://www.iana.org/assignments/link-relations/link-relations.xhtml">IANA</a>
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
public interface LinkRelations {

    /**
     * Prefered IRI for this resource
     */
    String SELF = "self";
    /**
     * IRI of next resource in a series
     */
    String NEXT = "next";
    /**
     * IRI of previous resource in a series
     */
    String PREV = "prev";
    /**
     * IRI of the first resource in a series
     */
    String FIRST = "first";
    /**
     * IRI of the last resource in a series
     */
    String LAST = "last";
    /**
     * IRI of the collection the resource belongs to
     */
    String COLLECTION = "collection";
    /**
     * IRI pointing to an item of a collection resource
     */
    String ITEM = "item";
    /**
     * Refers to a parent document in a hierarchy of documents
     */
    String UP = "up";
    /**
     * Refers to a resource that can be used to edit the link's context
     */
    String EDIT = "edit";
    /**
     * Refers to a resource that can be used to edit media associated with the
     * link's context.
     */
    String EDIT_MEDIA = "edit-media";
    /**
     * Help information
     */
    String HELP = "help";
    /**
     * License information
     */
    String LICENSE = "license";
    /**
     * IRI of resource allowing resource search capability
     */
    String SEARCH = "search";
    /**
     * IRI identifying Tag resource
     */
    String TAG = "tag";
    /**
     * Resource author
     */
    String AUTHOR = "author";
    /**
     * Substitutable alternative
     */
    String ALTERNATE = "alternate";
    /**
     * Additional historical content
     */
    String ARCHIVES = "archives";
    /**
     * Representation of the preferred version of the resource
     */
    String CANONICAL = "canonical";
    /**
     * Table of contents for the resource
     */
    String CONTENS = "contents";
    /**
     * Related resource
     */
    String RELATED = "related";
    /**
     * Most recent items in a collection of resources
     */
    String CURRENT = "current";
    /**
     * Describes privacy policy
     */
    String PRIVACY_POLICY = "privacy-policy";
    /**
     * Resource allowing to monitor changes in group of resources
     */
    String MONITOR_GROUP = "monitor-group";
    /**
     * The original resource this resource is description for
     */
    String DESCRIBES = "describes";
    /**
     * Points to resource description
     */
    String DESCRIBED_BY = "describedby";
    /**
     * Refers to a hub that enables registration for notification of updates to
     * the context
     */
    String HUB = "hub";
    /**
     * Refers to the terms of service associated with the link's context
     */
    String TERMS_OF_SERVICE = "terms-of-service";
    /**
     * Refers to a resource identifying the abstract semantic type of which the
     * link's context is considered to be an instance
     */
    String TYPE = "type";
    /**
     * Refers to further information about the link's context, expressed as a
     * LRDD ("Link-based Resource Descriptor Document") resource. See [RFC6415]
     * for information about processing this relation type in host-meta
     * documents. When used elsewhere, it refers to additional links and other
     * metadata. Multiple instances indicate additional LRDD resources. LRDD
     * resources MUST have an "application/xrd+xml" representation.
     */
    String LRDD = "lrdd";

    /**
     * Custom vote for alternative in a poll relationship
     */
    String VOTE = "http://iproduct.org/vote";

}
