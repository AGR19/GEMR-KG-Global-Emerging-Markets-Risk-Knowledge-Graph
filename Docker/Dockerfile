FROM ontotext/graphdb:10.7.0

# Install unzip
USER root
RUN apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/*

# Create the repository directory structure
RUN mkdir -p /opt/graphdb/home/data/repositories

# Copy the zip file
COPY endPoint/GEMR.zip /tmp/GEMR.zip

# Unzip and move to the correct location
RUN unzip /tmp/GEMR.zip -d /tmp/unzipped && \
    mv /tmp/unzipped/GEMR /opt/graphdb/home/data/repositories/GEMR && \
    rm -rf /tmp/GEMR.zip /tmp/unzipped

# Overwrite config.ttl with the correct version
COPY config.ttl /opt/graphdb/home/data/repositories/GEMR/config.ttl

# Expose the default GraphDB port
EXPOSE 7200
